import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import React from 'react';

type Person = {
  id: number;
  name: string;
  groups: string[];
  pic?: string;
  status?: string;
  self?: boolean;
}

const ProposalResponses = [
  "Let's get feral",
  "Probably, but not sure when",
  "Ehhhhh, maybe",
  "A quiet night in methinks, unless ...",
  "Fuck, no"
]

const Actions: React.FC<{
  network: Person[]
  focusGroup: string | null;
  setNetwork: (arr: Person[]) => void
}> = ({
  network,
  focusGroup,
  setNetwork
}) => {

  const [openCreate, setOpenCreate] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [groupName, setGroupName] = React.useState(""); // To store the group name
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [proposedPlan, setProposedPlan] = React.useState(""); // To store the group name
  const [selectedResponsess, setSelectedResponses] = React.useState<string[]>([]);

  // Handler to open the dialog
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
    setStep(1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Handler to close the dialog
  const handleCloseCreate = () => {
    setOpenCreate(false);
    setStep(1)
    setGroupName("")
    setSelectedNames([])
  };

  const handleSelectName = (name: string) => {
    setSelectedNames((prevSelectedNames) =>
      prevSelectedNames.includes(name)
        ? prevSelectedNames.filter((n) => n !== name)
        : [...prevSelectedNames, name]
    );
  };

    // Handler for creating a group
  const handleCreateGroup = () => {
    console.log("Creating group:", groupName);
    console.log("Selected members:", selectedNames);

    // TODO: This is horrible logic. Update.
    const updatedNetwork = network.map(person => ({
      ...person,
      groups: [...person.groups, groupName] // Example logic to add a new group
    }));

    setNetwork(updatedNetwork); 

    handleCloseCreate(); // Close the dialog after creation
  };
  
  // Handler for the user's choice
  const handleUserChoice = (choice: string) => {
    console.log(`User chose to ${choice}`);
    setOpenCreate(false);
  };

  const handleProposePlan = () => {

  }

  const handleClosePropose = () => {
    setProposedPlan("")
    setSelectedResponses([])
    setOpenCreate(false);
  }

  const handleSelectResponse = (resp: string) => {
    setSelectedResponses((prevSelectedResp) =>
      prevSelectedResp.includes(resp)
        ? prevSelectedResp.filter((n) => n !== resp)
        : [...prevSelectedResp, resp]
    );
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ justifySelf: 'flex-end' }}>
      <PeopleOutlineIcon/>
      <AddCircleOutlineIcon onClick={handleClickOpenCreate}/>
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        {step === 1 && (
          <>
            <DialogTitle>What would you like to do?</DialogTitle>
            <DialogContent>
              <p>Please choose an option:</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNextStep} color="primary">
                Create New Group
              </Button>
              <Button onClick={() => setStep(3)} color="primary">
                Propose New Plan
              </Button>
              <Button onClick={handleCloseCreate} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </>
        )}

        {step === 2 && (
          <>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogContent>
              <TextField
                label="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormGroup>
                {network.map((person) => (
                  <FormControlLabel
                    key={person.name}
                    control={
                      <Checkbox
                        checked={selectedNames.includes(person.name)}
                        onChange={() => handleSelectName(person.name)}
                      />
                    }
                    label={person.name}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateGroup} color="primary" disabled={!groupName || selectedNames.length === 0}>
                Create Group
              </Button>
              <Button onClick={handleCloseCreate} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </>
        )}

        {step === 3 && (
          <>
            <DialogTitle>Propose New Plan</DialogTitle>
            <DialogContent>
              <TextField
                label="New Plan"
                value={proposedPlan}
                onChange={(e) => setProposedPlan(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormGroup>
                <Typography variant="button" sx={{ mt: '20px', mb: '10px' }}> How can your invitees respond? </Typography>
                {ProposalResponses.map((response, index) => (
                  <FormControlLabel
                    key={`response-${index}`}
                    control={
                      <Checkbox
                        checked={selectedResponsess.includes(response)}
                        onChange={() => handleSelectResponse(response)}
                      />
                    }
                    label={response}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleProposePlan} color="primary" disabled={proposedPlan.length == 0 || selectedResponsess.length < 2 }>
                Propose Plan to Group
              </Button>
              <Button onClick={handleClosePropose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Actions;