export interface IEditorContext {
  /**
   * When the user types in the editor, the changes should be debounced for 2 seconds,
   * then automatically saved and the full content should be emitted.
   */
  setContent: (content: string) => void;

  /**
   * When any collaborator updates the content, the changes should be
   * reflected in real time for all connected collaborators.
   */
  content: string;
}