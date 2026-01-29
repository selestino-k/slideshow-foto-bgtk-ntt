'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import {LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface MenuCardProps {
  iconName: string;
  title: string;
  description: string;
  href: string;
  target?: string;
}

export default function MenuCard({ iconName, title, description, href, target }: MenuCardProps) {
  const Icon = (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.ImageIcon;

  

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 w-full"
    >
      <CardHeader>
        <Link href={href} target={target}>
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
        </Link>
      </CardHeader>
      
    </Card>
  );
}
