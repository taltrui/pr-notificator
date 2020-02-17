import { postMessage } from '../../handlers/slack/PostMessage';
import { formatPRData } from '../../utils/github';
import { createMessage } from './utils';
import { getPrs } from '../../models/github';
import { Config } from 'pr_reminder';
import { RepositoriesData } from 'github';

const execute = async (config: Config) => {
  const { channel, repositories, labelsToAvoid } = config;

  let repos;

  try {
    const { data } = await getPrs('widergy');
    repos = data;
  } catch (error) {
    console.log(error);
  }

  const formattedData = formatPRData(repos, repositories, labelsToAvoid);

  postMessage('Llegaron los PRs!', channel, await createMessage(formattedData));
};

export { execute };