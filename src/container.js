export class Container {
  providers;

  getDependency(key) {
    const matchedProvider = this.providers?.filter((prov) => prov.key === key)[0]

    if (matchedProvider) {
      return matchedProvider.value;
    } else {
      throw new Error(`No provider found for ${key}!`);
    }
  }
  addDependency(key, value) {
    if (!this.providers) {
      this.providers = [{ key, value }]
      return
    }
    this.providers.push({ key, value })
  }
}

export const container = new Container();