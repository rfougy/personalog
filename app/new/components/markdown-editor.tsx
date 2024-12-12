'use client';

import { useState } from 'react';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';
import { Toolbar } from './toolbar';
import { Preview } from './preview';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function MarkdownEditor() {
  const { value, handleChange, actions } = useMarkdownEditor();
  const [activeTab, setActiveTab] = useState<string>('write');

  return (
    <div className="bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <div className="flex items-center justify-between">
          <Toolbar actions={actions} />
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="write">
          <textarea
            className="w-full h-[calc(100vh-200px)] p-4 border resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Start writing your entry here..."
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="border rounded-md h-[calc(100vh-200px)] overflow-auto">
            <Preview content={value} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
