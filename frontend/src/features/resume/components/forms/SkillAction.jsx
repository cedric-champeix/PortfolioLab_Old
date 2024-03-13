import {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions,DialogTitle ,Checkbox, DialogContent, Chip, FormControlLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {bool, string} from "prop-types";
import EditIcon from "@mui/icons-material/Edit.js";

export default function SkillAction({
                                        type,
                                        skillId,
                                        skillName,
                                        description,
                                        mastery,
                                        isSoft,
                                        createSkill,
                                        updateSkill,
                                        resumeId
                                    }) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({name:  "", description: "", mastery: "", isSoft:  false});

    const toggle = () => {
        setData({name: skillName, description: description, mastery: mastery, isSoft: isSoft})
        setOpen(!open);
    }

    const handleSubmit = () => {
        const body = {
            name: data.name,
            description: data.description,
            mastery: data.mastery,
            isSoft: data.isSoft,
            resumeId: resumeId
        }
        console.log(body)
        switch (type) {
            case "edit":
                updateSkill(skillId, body)
                break;
            case "add":
                createSkill(body);
                break;
        }
        toggle();
    }

    return <>
        <Paper >
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit skill ${skillName}` : "Create a skill"}</DialogTitle>
                    <Box  style={{width: "400px"}} component="form">
                        <DialogContent>
                            <TextField
                                autoFocus
                                value={data.name}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        name: e.target.value
                                    })
                                }}
                                margin="dense"
                                required
                                id="name"
                                label="Skill name"
                                type="name"
                                fullWidth
                                variant="standard"
                            />
                            <br/>
                            <br/>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isSoft"
                                        value={data.isSoft}
                                        onChange={() => setData({...data, isSoft: !data.isSoft})}
                                    />
                                }
                                label="Soft Skill ?"/>

                            <br/><br/>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={toggle} color="error">Close</Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                    </Box>
            </Dialog>
        </Paper>
        {
            type === "edit" ?
                <EditIcon style={{marginLeft: "10px"}} onClick={toggle}/>
                :
                (<Chip
                    icon={<ControlPointIcon/>}
                    style={{marginTop: "10px"}}
                    label={"Add"}
                    variant="outlined"
                    onClick={toggle}
                >
                </Chip>)

        }

    </>
}

SkillAction.propTypes = {
    type: string,
    skillId: string,
    skillName: string,
    description: string,
    mastery: string,
    isSoft: bool,
    createSkill: () => {},
    updateSkill: () => {},
    resumeId: string


}