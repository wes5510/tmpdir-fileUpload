import request from 'supertest';
import Config from 'config';
import rimraf from 'rimraf';
import app, { server } from '../../../../index.js';

afterAll((done) => {
  server.close(done);
});

describe('file', () => {
  test('[router] POST /api/v1/file, Success', (done) => {
    const fileRootPath = Config.get('tmpdir.file.root');
    rimraf.sync(`${fileRootPath}/*`);
    const beforeSendTime = (new Date()).getTime();
    request(app)
      .post('/api/v1/file')
      .field('name', 'file0')
      .attach('file0', '/workspace/tmpdir-fileUpload/data/test/mb.txt')
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
      
        // check file
        const listInRoot = fs.readdirSync(fileRootPath);
        console.log(listInRoot);
        expect(listInRoot.length).toEqual(1);
        expect(listInRoot.length).toEqual(1);
      
        // check fileInfo
        const afterSendTime = (new Date()).getTime();
        expect(typeof res.body.id === 'string').toEqual(true);
        expect(res.body.submissionTime).toBeGreaterThanOrEqual(beforeSendTime);
        expect(res.body.submissionTime).toBeLessThanOrEqual(afterSendTime);
        expect(res.body.expireTime).toEqual(res.body.submissionTime + Config.get('tmpdir.file.expireTermDay'));
        done();
    });
  });
});