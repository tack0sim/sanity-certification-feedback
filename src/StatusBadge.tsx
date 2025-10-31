import { Badge } from '@sanity/ui';

type StatusBadgeProps = {
  status?: string;
  fontSize?: number;
};

export function StatusBadge({
  status = 'PENDING',
  fontSize = 2,
}: StatusBadgeProps) {
  return (
    <Badge
      tone={
        status === 'approved'
          ? 'positive'
          : status === 'spam'
          ? 'caution'
          : 'default'
      }
      padding={2}
      fontSize={fontSize}
    >
      {status.toUpperCase()}
    </Badge>
  );
}
