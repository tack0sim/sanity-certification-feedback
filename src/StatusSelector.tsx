import { Button, Grid } from '@sanity/ui';

type StatusSelectorProps = {
  status: string;
  setStatus: (nextStatus: string) => void;
};

const STATUSES = ['All', 'Pending', 'Spam', 'Approved'];

export function StatusSelector({ status, setStatus }: StatusSelectorProps) {
  return (
    <Grid columns={[2, 2, 2, 4]} gap={1}>
      {STATUSES.map((statusOption) => (
        <Button
          key={statusOption}
          mode={statusOption.toLowerCase() === status ? 'default' : 'ghost'}
          onClick={() => setStatus(statusOption.toLowerCase())}
          text={statusOption}
        />
      ))}
    </Grid>
  );
}
