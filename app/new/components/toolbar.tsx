import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading,
  Quote,
  Code,
  Link,
  Image,
} from 'lucide-react';

interface ToolbarProps {
  actions: {
    [key: string]: () => void;
  };
}

export function Toolbar({ actions }: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 border-b rounded-md">
      <Button variant="outline" size="icon" onClick={actions.bold}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.italic}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.bulletList}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.numberedList}>
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.heading}>
        <Heading className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.quote}>
        <Quote className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.code}>
        <Code className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.link}>
        <Link className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={actions.image}>
        <Image className="h-4 w-4" />
      </Button>
    </div>
  );
}
