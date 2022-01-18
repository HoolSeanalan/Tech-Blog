const helpers = {
    formatDate: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    formatUrl: url => {
        return url ? url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "") : "";
    },
    formatPlural: (word, amount) => {
        if (amount === 1) {
            return word;
        } else {
            return `${word}s`;
        }
    },
};

export default helpers;