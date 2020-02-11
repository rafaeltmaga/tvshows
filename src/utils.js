import moment from "moment"

export const sortAndGroup = (list) => {
    const sorted = list.sort(compareAlphabetical)

    const res = sorted.reduce((re, o) => {
    const existObj = re.find(obj => {
        return obj.id === o.network.id
    })
    if (existObj) {
        existObj.shows.push(o.show)
    } else {
        re.push({
            id: o.network.id,
            network: o.network.name,
            shows: [o.show]
        })
    }
    return re
    }, [])
    
    const ordered = res.map(item => {
        item.shows = item.shows.sort(compareTime)
        return item
    })
    
return ordered
}

function compareAlphabetical(a, b) {
    if (a.network && b.network) {
        const networkA = a.network.name.charAt(0)
        const networkB = b.network.name.charAt(0)

        let comparison = 0
        if (networkA > networkB) {
            comparison = 1
        } else if (networkA < networkB) {
            comparison = -1
        }
        return comparison
    }
    return null
}

function compareTime(a, b) {

        const timeA = moment(a.time, "HH:mm")
        const timeB = moment(b.time, "HH:mm")

        let comparison = 0
        if (timeA > timeB) {
            comparison = 1
        } else if (timeA < timeB) {
            comparison = -1
        }
        return comparison
    

}