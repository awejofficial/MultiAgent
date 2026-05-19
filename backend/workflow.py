from langgraph.graph import StateGraph, END
from state import TriageState
from nodes import classify_document, analyze_medical, process_general_rag

def route_document(state: TriageState) -> str:
    """
    Conditional edge routing function.
    Checks the doc_type state variable and splits the flow.
    """
    doc_type = state.get("doc_type", "general")
    if doc_type == "medical":
        return "analyze_medical"
    else:
        return "process_general_rag"

def create_workflow():
    # Instantiate the StateGraph
    workflow = StateGraph(TriageState)
    
    # Add nodes
    workflow.add_node("classify", classify_document)
    workflow.add_node("analyze_medical", analyze_medical)
    workflow.add_node("process_general_rag", process_general_rag)
    
    # Set the entry point
    workflow.set_entry_point("classify")
    
    # Add conditional edges
    workflow.add_conditional_edges(
        "classify",
        route_document,
        {
            "analyze_medical": "analyze_medical",
            "process_general_rag": "process_general_rag"
        }
    )
    
    # Add edges to END
    workflow.add_edge("analyze_medical", END)
    workflow.add_edge("process_general_rag", END)
    
    # Compile
    return workflow.compile()

app = create_workflow()
