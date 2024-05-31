const path = require("path");
module.exports = (config) => {
    if (!config.resolve.alias) config.resolve.alias = {};
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components/');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks/');
    config.resolve.alias['@services'] = path.resolve(__dirname, 'src/services/');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils/');
    config.resolve.alias['@const'] = path.resolve(__dirname, 'src/const.ts');

    return config;
}