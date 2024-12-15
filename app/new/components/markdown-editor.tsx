'use client';

import { useState } from 'react';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';
import { Toolbar } from './toolbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PublishButton } from './publish-button';
import { MarkdownContent } from '@/components/markdown-content';

export function MarkdownEditor({ userId }: { userId: string | undefined }) {
  const [activeTab, setActiveTab] = useState<string>('write');
  const [title, setTitle] = useState<string>('');

  const { value, handleChange, actions } = useMarkdownEditor();

  return (
    <div className="bg-transparent flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <Toolbar actions={actions} />
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="write">
          <textarea
            className="w-full h-[calc(100vh-200px)] p-4 border resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-foreground"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Start writing here..."
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="border rounded-md h-[calc(100vh-200px)] overflow-auto">
            <div className="p-4 prose max-w-none">
              <MarkdownContent content={value} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {userId && (
        <PublishButton userId={userId} title={title} content={value} />
      )}
    </div>
  );
}
