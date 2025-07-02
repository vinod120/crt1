class LocalDB {
  /**
   * Retrieves a string value from localStorage
   * @param key - The key of the item to retrieve
   * @returns The value associated with the key, or null if not found
   */
  getVal(key: string): string | null {
    if (!key) return null;

    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  }

  /**
   * Sets a string value in localStorage
   * @param key - The key to associate with the value
   * @param val - The string value to store
   */
  setVal(key: string, val: string): void {
    if (!key || val === undefined) return;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, val);
    }
  }

  /**
   * Retrieves an object from localStorage
   * @param key - The key of the item to retrieve
   * @returns The parsed object, or an empty object if not found or if parsing fails
   */
  getObject<T = Record<string, any>>(key: string): T {
    if (!key) return {} as T;

    try {
      const item = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;

      return item ? (JSON.parse(item) as T) : ({} as T);
    } catch (error) {
      console.warn(`Error parsing JSON for key "${key}":`, error);

      return {} as T;
    }
  }

  /**
   * Sets an object in localStorage
   * @param key - The key to associate with the object
   * @param val - The object to store (will be stringified)
   */
  setObject<T extends Record<string, any>>(key: string, val: T): void {
    if (!key || val === undefined) return;

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (error) {
        console.warn(`Error stringifying value for key "${key}":`, error);
      }
    }
  }

  /**
   * Removes an item from localStorage
   * @param key - The key of the item to remove
   */
  remove(key: string): void {
    if (!key) return;

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clears all items in localStorage
   */
  clear(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}

// Export a singleton instance of LocalDB for use across the app
const LocalDBObj = new LocalDB();

export default LocalDBObj;
