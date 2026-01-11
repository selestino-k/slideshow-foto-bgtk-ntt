'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuCardProps {
  iconName: string;
  title: string;
  href: string;
}

export default function MenuCard({ iconName, title, href }: MenuCardProps) {
  const router = useRouter();
  const Icon = (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.ImageIcon;

  const handleClick = () => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="w-full h-full p-0"
      >
        <CardContent className="flex items-center gap-8 p-8 bg-primary hover:bg-primary/90 text-white w-full">
          <Icon className="max-w-7xl max-h-7xl" />
          <span className="text-2xl font-semibold">{title}</span>
        </CardContent>
      </Button>
    </Card>
  );
}
