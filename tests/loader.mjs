export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    specifier = new URL(`../${specifier.slice(2)}`, import.meta.url).href;
  }

  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    if (!(specifier.startsWith(".") || specifier.startsWith("file:") || specifier.startsWith("/"))) {
      throw error;
    }
    try {
      return await nextResolve(`${specifier}.ts`, context);
    } catch {
      return nextResolve(`${specifier}/index.ts`, context);
    }
  }
}
