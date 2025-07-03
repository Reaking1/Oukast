import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminAPI } from "@/services/api";
import { AdminData } from "@/Types/Admin";
import React, { useState } from "react";




const CreateAdminForm: React.FC = () => {
    const [formData, setFormData] = useState<AdminData>({
   name: "",
    surname: "",
    email: "",
    password: "",
    role: "admin",
    dateOfBirth: new Date(),
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string  |  null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value} = e.target;

       if(name === "dateOfBirth") {
        setFormData({...formData, [name]: new Date(value)});
       } else {
        setFormData({...formData, [name]: value });
       }
    };

    const handleRoleChange = (value: 'admin' | 'super-admin') => {
        setFormData({ ...formData, role: value})
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
  
    await AdminAPI.createAdmin(formData);
    setSuccess("Admin created successfully");
    setFormData({ name: "", surname: "", email: "", password: "", role: "admin", dateOfBirth: new Date(),});
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create admin.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
    }
 return(
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
   
   <div>
  <Label htmlFor="surname">Surname</Label>
  <Input
    id="surname"
    name="surname"
    value={formData.surname}
    onChange={handleChange}
    required
  />
</div>

<div>
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

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="super-admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </Button>

      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
 

}
export default CreateAdminForm;