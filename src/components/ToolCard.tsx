import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: string;
}

export const ToolCard = ({ title, description, icon: Icon, path, category }: ToolCardProps) => {
  return (
    <Link to={path}>
      <div className="relative overflow-hidden rounded-xl p-6 glass-card 
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    group border border-white/20 hover:border-primary/20
                    bg-white/5 backdrop-blur-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {category}
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4
                        group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};