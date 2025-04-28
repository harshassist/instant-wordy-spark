
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ProfileEducationInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ProfileEducationInput({ value, onChange }: ProfileEducationInputProps) {
  const [newEducation, setNewEducation] = useState("");

  const handleAdd = () => {
    if (newEducation.trim()) {
      onChange([...value, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newEducation}
          onChange={(e) => setNewEducation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add education..."
        />
        <Button 
          type="button"
          onClick={handleAdd}
          disabled={!newEducation.trim()}
        >
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2 bg-secondary p-2 rounded-md">
            <span className="flex-1">{item}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
