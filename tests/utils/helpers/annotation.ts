export const annotation = (file: string, description: string) => ({
  annotation: {
    type: `file/${file}`,
    description
  }
});
