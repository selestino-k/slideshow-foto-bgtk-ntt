'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface MenuCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

export default function MenuCard({ icon: Icon, title, href }: MenuCardProps) {
  const router = useRouter();

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
        <CardContent className="flex items-center gap-4 p-8 bg-blue-600 hover:bg-blue-700 text-white w-full">
          <Icon className="max-w-7xl max-h-7xl" />
          <span className="text-2xl font-semibold">{title}</span>
        </CardContent>
      </Button>
    </Card>
  );
}
