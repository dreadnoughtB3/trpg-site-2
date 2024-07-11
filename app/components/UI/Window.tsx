import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WindowProps {
  title: string;
  children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, children }) => {
  return (
    <Card className="bg-gray-900 border-green-500 text-green-500">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Window;