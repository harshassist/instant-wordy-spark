
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ProfileSkillsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ProfileSkillsInput({ value, onChange }: ProfileSkillsInputProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      onChange([...value, newSkill.trim()]);
      setNewSkill("");
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
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add skill..."
        />
        <Button 
          type="button"
          onClick={handleAdd}
          disabled={!newSkill.trim()}
        >
          Add
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {value.map((skill, index) => (
          <div key={index} className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <span>{skill}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
