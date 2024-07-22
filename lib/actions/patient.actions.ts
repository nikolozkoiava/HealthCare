import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const creatureUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
  } catch (error) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("emil", [user.email])]);

      return documents?.users[0];
    }
  }
};
