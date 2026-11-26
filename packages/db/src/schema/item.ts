// import type { ShapeAttrs } from "@/lib/canvas";
import { generateId } from "@dont-lose-it/core";
import { sql } from "drizzle-orm";
import {
	check,
	foreignKey,
	index,
	//jsonb,
	pgTable,
	text,
	unique,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { timestamptz } from "./fields/timestamptz";

export const container = pgTable(
	"container",
	{
		id: text("id").primaryKey().$defaultFn(generateId("v7")),
		parentId: text("parent_id"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
		name: text("name").notNull(),
		description: text("description"),
		scanCode: text("scan_code"),
		//shape: jsonb("shape").$type<ShapeAttrs>(),
		createdAt: timestamptz("created_at").defaultNow().notNull(),
		updatedAt: timestamptz("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(t) => [
		check("container_not_own_parent", sql`${t.parentId} <> ${t.id}`),
		// Target for the composite foreign keys below
		unique("container_id_user_id_unique").on(t.id, t.userId),
		// A parent container must belong to the same user
		foreignKey({
			name: "container_parent_same_user_fk",
			columns: [t.parentId, t.userId],
			foreignColumns: [t.id, t.userId],
		}).onDelete("restrict"),
		index("container_parent_id_idx").on(t.parentId),
		index("container_user_id_idx").on(t.userId),
		uniqueIndex("container_scan_code_user_id_uidx").on(t.scanCode, t.userId),
	],
);
