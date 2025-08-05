/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import { db } from '../../db/database-connection';
import { users } from '../../db/schema';
import { eq, ilike, and, ne } from 'drizzle-orm';

export class AuthService {
  static async registerUser(userData: { email: string; password: string; name?: string }) {
    return db.insert(users).values(userData).returning().execute();
  }

  static async loginUser(email: string) {
    return db
      .select({ id: users.id, passwordHash: users.password })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute();
  }

  static async updateUser(
    id: string,
    updateData: Partial<{ email: string; password: string; name: string }>,
  ) {
    return db.update(users).set(updateData).where(eq(users.id, id)).returning().execute();
  }

  static async deleteUser(id: string) {
    return db.delete(users).where(eq(users.id, id)).returning().execute();
  }

  static async existingUser(email: string) {
    return db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute()
      .then((users) => users.length > 0);
  }
}
