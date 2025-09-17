import { Before, After, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';
import fs from 'fs';
import path from 'path';


const resultsDir = path.join(process.cwd(), 'allure-results');

// Make sure results dir exists
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

Before(async function (this: CustomWorld) {
  await this.context.tracing.start({ screenshots: true, snapshots: true });
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const name = scenario.pickle.name.replace(/\s+/g, '_');

  // Screenshot on failure
  if (scenario.result?.status === Status.FAILED && this.page) {
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, 'image/png');
  }


  // Stop trace and attach
  await this.context.tracing.stop({ path: `reports/traces/${name}.zip` });
  const traceBuffer = fs.readFileSync(`reports/traces/${name}.zip`);
  await this.attach(traceBuffer, 'application/zip');

  // Video attach
  const videoPath = await this.page.video()?.path();
  if (videoPath) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }

  // Minimal Allure JSON (per scenario)
  // const allureFile = path.join(resultsDir, `${Date.now()}-${name}.json`);
  // fs.writeFileSync(
  //   allureFile,
  //   JSON.stringify({
  //     name: scenario.pickle.name,
  //     status: scenario.result?.status,
  //     attachments: [
  //       { name: 'screenshot', type: 'image/png' },
  //       { name: 'trace', type: 'application/zip' },
  //       { name: 'video', type: 'video/webm' }
  //     ]
  //   })
  // );
});


