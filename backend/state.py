from typing import TypedDict, Optional, Any

class TriageState(TypedDict):
    """
    State schema for the triage workflow.
    """
    file_path: Optional[str]
    user_symptoms: Optional[str]
    extracted_text: Optional[str]
    doc_type: Optional[str]  # 'medical' or 'general'
    final_answer: Optional[Any]
    # For RAG context if non-medical
    rag_context: Optional[str]
