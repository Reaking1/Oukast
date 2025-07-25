import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AdminData, FullAdmin } from "@/Types/Admin";

interface Props {
  onCreateAdmin: (data: AdminData) => Promise<void>;
  admins: FullAdmin[]; // ✅ Add this to display admin list
}

const CreateAdminForm: React.FC<Props> = ({ onCreateAdmin, admins }) => {
  const [formData, setFormData] = useState<AdminData>({
    name: "",
    surname: "",
    dateOfBirth: new Date(),
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dateOfBirth" ? new Date(value) : value,
    }));
  };

  const handleRoleChange = (value: "admin" | "super-admin") => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreateAdmin(formData);
      toast.success("✅ Admin created successfully!");
      setFormData({
        name: "",
        surname: "",
        dateOfBirth: new Date(),
        email: "",
        password: "",
        role: "admin",
      });
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`❌ Failed to create admin: ${errMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const formFields: Array<keyof Pick<AdminData, "name" | "surname" | "email" | "password">> = [
  "name",
  "surname",
  "email",
  "password",
];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-extrabold text-black mb-4">👤 Create New Admin</h2>

       {formFields.map((field) => (
  <div className="space-y-1" key={field}>
    <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
    <Input
      id={field}
      name={field}
      type={field === "password" ? "password" : "text"}
      value={formData[field]}
      onChange={handleChange}
      required
    />
  </div>
))}

        <div className="space-y-1">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>

<div className="space-y-1 relative z-50">
  <Label htmlFor="role">Role</Label>
  <Select value={formData.role} onValueChange={handleRoleChange}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent className="z-50">
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="super-admin">Super Admin</SelectItem>
    </SelectContent>
  </Select>
</div>

<div className="pt-6">
  <Button
    type="submit"
    disabled={loading}
    className="w-full bg-black hover:bg-gray-800 text-white text-md font-semibold"
  >
    {loading ? "Creating..." : "🚀 Create Admin"}
  </Button>
</div>

      </form>

      <div className="mt-10 max-w-xl">
        <h3 className="text-xl font-bold mb-2 text-black">🧾 Existing Admins</h3>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {admins.length === 0 ? (
            <p className="text-gray-500">No admins found.</p>
          ) : (
            admins.map((admin) => (
              <div
                key={admin._id}
                className="p-4 rounded-lg border border-gray-300 shadow-sm bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-black">{admin.name} {admin.surname}</p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                  <p className="text-sm text-gray-500">
                    Role: <span className="capitalize">{admin.role}</span> — Status:{" "}
                    <span className={admin.isApproved ? "text-green-600" : "text-orange-500"}>
                      {admin.isApproved ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAdminForm;
