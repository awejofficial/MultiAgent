import argparse
import os
from extractor import extract_text_from_pdf
from workflow import app
from dotenv import load_dotenv

def main():
    load_dotenv()
    
    if not os.getenv("GROQ_API_KEY") or os.getenv("GROQ_API_KEY") == "your_groq_api_key_here":
        print("Warning: GROQ_API_KEY is not set correctly in .env file.")
        
    parser = argparse.ArgumentParser(description="Document Analysis and Triage CLI")
    parser.add_argument("--file", type=str, help="Path to the document (PDF/TXT) to analyze", required=True)
    parser.add_argument("--symptoms", type=str, help="User symptoms or query text", required=True)
    
    args = parser.parse_args()
    
    if not os.path.exists(args.file):
        print(f"Error: Document file not found at {args.file}")
        return
        
    print(f"Extracting text from {args.file}...")
    extracted_text = extract_text_from_pdf(args.file)
    
    if not extracted_text:
        print("Error: Could not extract text from the PDF. It might be empty or unreadable.")
        return
        
    print("Initializing state...")
    initial_state = {
        "file_path": args.file,
        "user_symptoms": args.symptoms,
        "extracted_text": extracted_text,
        "doc_type": None,
        "final_answer": None,
        "rag_context": None
    }
    
    print("Running workflow...\n")
    # Stream the steps
    for s in app.stream(initial_state):
        if "classify" in s:
            print(f"--- Router Classification ---")
            print(f"Document type detected: {s['classify']['doc_type'].upper()}")
            print("-" * 30 + "\n")
        elif "analyze_medical" in s:
            print(f"--- Medical Diagnosis & Triage ---")
            print(s["analyze_medical"]["final_answer"])
            print("-" * 30 + "\n")
        elif "process_general_rag" in s:
            print(f"--- General Document RAG Response ---")
            print(s["process_general_rag"]["final_answer"])
            print("-" * 30 + "\n")

if __name__ == "__main__":
    main()
