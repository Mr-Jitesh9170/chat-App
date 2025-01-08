import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const dateToString = (timestamp) => {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(new Date(timestamp), 'mini')
}
