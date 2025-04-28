const parseEnv = () => {
    const PREFIX = 'RSS_';

    const result = Object.entries(process.env)
        .filter(([key]) => key.startsWith(PREFIX))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(result);
};

parseEnv();
