import { Schema, model, models } from "mongoose";

export interface NavbarItem {
	id: string;
	label: string;
	href: string;
	order: number;
	visible?: boolean;
}

export interface NavbarDocument {
	_id: string;
	items: NavbarItem[];
	updatedAt: Date;
}

const navbarItemSchema = new Schema<NavbarItem>({
	id: { type: String, required: true },
	label: { type: String, required: true },
	href: { type: String, required: true },
	order: { type: Number, required: true },
	visible: { type: Boolean, default: true },
});

const navbarSchema = new Schema<NavbarDocument>(
	{
		items: { type: [navbarItemSchema], default: [] },
	},
	{ timestamps: true }
);

export const NavbarModel = models.Navbar || model<NavbarDocument>("Navbar", navbarSchema);


