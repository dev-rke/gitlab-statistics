const path = require('path');
const waitOn = require('wait-on');
const elasticsearch = require('elasticsearch');
const gitlabModule = require('gitlab');
const config = require('./config');

const waitOpts = {
  resources: [config.elasticsearch.url || 'elasticsearch:9200'],
  delay: 1000,
  interval: 1000,
  timeout: 100000,
};

waitOn(waitOpts, (err) => {
  if (err) {
    console.error('Error connecting to elasticsearch instance.');
    return;
  }

  console.log('Connection to elasticsearch successful.');
  console.log('Starting import...');

  const INDEX = config.elasticsearch.index || 'gitlab_statistics';
  const TIMESTAMP = (new Date()).toISOString();

  const gitlab = gitlabModule({
    url: config.gitlab.url,
    token: config.gitlab.token,
  });

  const es = new elasticsearch.Client({
    host: config.elasticsearch.url || 'elasticsearch:9200',
    log: config.elasticsearch.log || ['error', 'warning'],
    sniffOnStart: true,
    sniffInterval: 60000,
  });

  // es.indices.delete({ index: INDEX });

  gitlab.projects.all((projects) => {
    projects.forEach((project) => {
      if (project) {
        const projectPath = project.path_with_namespace;
        const opts = { recursive: true };
        gitlab.projects.repository.listTree(projectPath, opts, (repository) => {
          if (repository) {
            const files = [];
            repository.forEach((file) => {
              if (file) {
                if (file.type === 'blob') {
                  files.push({
                    index: {
                      _index: INDEX,
                      _type: projectPath,
                      _id: file.id,
                    },
                  });
                  files.push({
                    name: file.name,
                    path: file.path,
                    ext: path.extname(file.name),
                    mode: file.mode,
                    timestamp: TIMESTAMP,
                  });
                }
              }
            });
            es.bulk({ body: files });
          }
        });
      }
    });
  });
});
