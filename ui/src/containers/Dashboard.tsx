import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
type Props = {};

const client = createDockerDesktopClient();
function useDockerDesktopClient() {
  return client;
}

const Dashboard = (props: Props) => {
  const [response, setResponse] = React.useState<string>();
  const [containers, setContainers] = React.useState<any[]>([]);
  const [logs, setLogs] = React.useState<any[]>([]);
  const [metrics, setMetrics] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();

  
  React.useEffect(() => {
    // List all containers
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
      // result.parseJsonLines() parses the output of the command into an array of objects
      setContainers(result.parseJsonLines());
    }).then((result)=>{
    containers.forEach((container) => {
      ddClient.docker.cli.exec(`container logs 13e999354149`, []).then((result) => {
        setLogs(logs.concat(result.stderr));
      });
    })});
    // ddClient.docker.cli.exec(`container logs 13e999354149`, []).then((result) => {
    //   console.log(result.stderr);
    //   setLogs(logs.concat(result.stderr));
    // })
  }, []);

  const fetchAndDisplayResponse = async () => {
    try {
      const result = await ddClient.extension.vm?.service?.get('/hello');
      setResponse(JSON.stringify(result));
    } catch (e: any) {
      setResponse(e.message);
    }
  };

  const fetchContainers = () => {
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
      setContainers(result.parseJsonLines());
    });
  }
    
  

  return (
    <Box>
      {/* // <Typography variant='h3'>Docker extension demo</Typography>
      //{' '} */}
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack
        direction='row'
        alignItems='start'
        spacing={2}
        sx={{ mt: 4 }}>
        <Button
          variant='contained'
          onClick={() => fetchContainers()}>
          Call backend
        </Button>

        <TextField
          label='Backend response'
          sx={{ width: 480 }}
          disabled
          multiline
          variant='outlined'
          minRows={5}
          value={logs ?? ''}/>
      </Stack>
    </Box>
  ); 
};

export default Dashboard;
  