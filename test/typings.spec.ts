import { Options } from "react-native-local-mongodb";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("typings", () => {
  test('Options["storage"]', async () => {
    const storage: Options["storage"] = AsyncStorage;
    expect(storage).toBeTruthy();
  });
});
