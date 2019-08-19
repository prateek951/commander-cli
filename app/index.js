#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const commander = require('commander');
const asyncCall = require('../asyncCall');
const cTable = require('console.table');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

commander
  .command('ls-projects')
  .alias('ls-p')
  .description('List all your Projects')
  .action(async () => {
    clear();
    console.log(chalk.blue('------------'));
    console.log(chalk.blue('Hello world!'));
    console.log(chalk.blue('------------'));
    console.log(chalk.blue('All projects'));
    const result = await asyncCall('get', 'projects.json', {});
    const { projects } = result.data;
    const projectNames = projects.map(item => ({
      "Name": item.name,
      "ID": item.id,
      "Identifier": item.identifier,
      "Created On": item.created_on,
      "Updated on": item.updated_on,
    }));
    console.table(projectNames);
  });

commander
  .command('show-issue')
  .alias('ls-i')
  .description('Show an Issue. Enter the Id of an User Story to get details')
  .action(() => {
    clear();
    console.log(chalk.blue('------------'));
    console.log(chalk.blue('Get a particular issue'));
    console.log(chalk.blue('------------'));
    readline.question(`Enter the Issue id? `, async (id) => {
      console.log(`Hi ${id}!`)
      const result = await asyncCall('get', `issues/${id}.json`);
      if(result.data) {
        const { issue } = result.data;
        const USDetails = [
          {
            "Subject": chalk.green(issue.subject),
            "tracker": chalk.green(issue.tracker.name),
            "status": chalk.green(issue.status.name),
            "priority": chalk.green(issue.priority.name),
            "author": chalk.green(issue.author.name),
            "project": chalk.green(issue.project.name),
          },
        ];
        console.log();
        console.table(USDetails);
        console.log();
        console.log(chalk.blue('---------- Description ----------'));
        console.log(issue.description);
        readline.close();
      } else {
        console.error(chalk.red('Oops! Some error occurred.'));
      }
    });
  });

  commander
  .command('ls-issues')
  .alias('ls-all')
  .description('All issues')
  .action(async () => {
    clear();
    console.log(chalk.blue('------------'));
    console.log(chalk.blue('List of all the Issues'));
    console.log(chalk.blue('------------'));
    readline.question(`Enter the Project id for which you want the issues? `, async (id) => {
      console.log(`Hi ${id}!`);
      const result = await asyncCall('get', `issues.json?project_id=${id}&limit=100`, {});
      if(result.data) {
          const { issues } = result.data;
          const issueTable = issues.map(item => ({
            "User Story": item.id,
            "Subject": item.subject,
            "Author": item.author ? item.author.name : '',
            "Tracker": item.tracker ? item.tracker.name : '',
            "Status": item.status ? item.status.name : '',
            "Priority": item.priority ? item.priority.name : '',
            "Assigned to": item.assigned_to ? item.assigned_to.name : '',
          }));
          console.table(issueTable);
          readline.close();
      } else {
        console.error(chalk.red('Oops! Some error occurred.'));
      }
    });
  });
commander.parse(process.argv);
