const config = {
  gitlab: {
    url: 'https://gitlab.example.com',
    token: 'your private token here',
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200',
    index: 'gitlab_statistics',
    log: ['error', 'warning'],
  },
};

module.exports = config;
