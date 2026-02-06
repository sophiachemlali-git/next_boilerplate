export const isObjectNotEmpty = (obj: object | null): boolean => {
  return (obj && Object.keys(obj)?.length > 0) || false
}
