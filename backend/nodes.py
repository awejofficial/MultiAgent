import os
from typing import Dict, Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq LLM
llm = ChatGroq(model_name="llama3-8b-8192", temperature=0)

def classify_document(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Router Prompt: "You are a classifier. Look at this text and output strictly 'medical' or 'general'."
    """
    text = state.get("extracted_text", "")
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a classifier. Look at this text and output strictly 'medical' or 'general'."),
        ("human", "Text:\n{text}")
    ])
    
    chain = prompt | llm | StrOutputParser()
    result = chain.invoke({"text": text[:2000]}) # Limit text length for classification
    
    doc_type = result.strip().lower()
    if "medical" in doc_type:
        doc_type = "medical"
    else:
        doc_type = "general"
        
    return {"doc_type": doc_type}

def analyze_medical(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Diagnostician Prompt: "You are an expert medical AI. Analyze the provided symptoms and clinical text, then generate a structured summary."
    """
    text = state.get("extracted_text", "")
    symptoms = state.get("user_symptoms", "")
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert medical AI. Analyze the provided symptoms and clinical text, then generate a structured summary including Diagnosis and Triage recommendations."),
        ("human", "Symptoms: {symptoms}\n\nClinical Text:\n{text}")
    ])
    
    chain = prompt | llm | StrOutputParser()
    result = chain.invoke({"symptoms": symptoms, "text": text})
    
    return {"final_answer": result}

def process_general_rag(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    RAG Pipeline for Non-Medical Document: Chunk + Embed + Retrieve.
    Then Research + Semantic Search.
    """
    text = state.get("extracted_text", "")
    symptoms = state.get("user_symptoms", "") # in this context it acts as the query
    
    if not text:
        return {"final_answer": "No text extracted from document."}
        
    # Chunking
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = text_splitter.create_documents([text])
    
    # Initialize ephemeral Chroma client
    client = chromadb.EphemeralClient()
    collection = client.create_collection(name="general_docs")
    
    # Simple embedding using Chroma's default sentence-transformers
    collection.add(
        documents=[doc.page_content for doc in docs],
        ids=[str(i) for i in range(len(docs))]
    )
    
    # Retrieve
    query = symptoms if symptoms else "Summarize the document."
    results = collection.query(
        query_texts=[query],
        n_results=min(3, len(docs))
    )
    
    context = "\n\n".join(results["documents"][0]) if results["documents"] else ""
    
    # QA Chain
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful research assistant. Answer the query based on the provided context. If the context is insufficient, say so."),
        ("human", "Query: {query}\n\nContext:\n{context}")
    ])
    
    chain = prompt | llm | StrOutputParser()
    answer = chain.invoke({"query": query, "context": context})
    
    return {"final_answer": answer, "rag_context": context}
