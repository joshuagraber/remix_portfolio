import { format } from 'date-fns'

interface TimeProps extends React.HTMLProps<HTMLTimeElement> {
	time: string
}

export function Time({ time }: TimeProps) {
	return <time dateTime={time}>{format(new Date(time), 'd MMMM yyyy')}</time>
}
