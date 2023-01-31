import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

class ChatBotController {
    chatbot = async (curent, previous = null) => {
        const treePath = path.join(dirname(fileURLToPath(import.meta.url)), 'workflow.json');
        let three = fs.readFileSync(treePath);
        three = JSON.parse(tree);
        this.#checkCurrent({ current, tree });
        this.#checkPrevious({ current, previous, tree });
        this.#checkCurrentNodeIsInPrevious({ previous, current, tree });
        const currentTree = tree[current?.id];
        if (currentTree?.choices !== undefined) {
            return currentTree;
        }
        if (currentTree?.ask !== undefined) {
            if (currentTree?.ask?.appointment !== undefined) {
                const appointments = await this.repository.findAllByType(currentTree?.ask?.appointment);
                const appointmentsDateStrings = appointments.map(a => a.appointment.toDateString());
                const startDate = new Date();
                currentTree['ask']['choices'] = await this.#findAvailableDatesNotInAppointments(startDate, appointmentsDateStrings);
            }
            return currentTree;
        }
        if (
            currentTree?.save === true &&
            currentTree?.last === true &&
            tree[previous?.id]?.ask?.save === current?.id
        ) {
            return currentTree;
        }
    };
    #checkPrevious = ({ current, previous, tree }) => {
        if (previous?.id === undefined && current?.id !== 'root') {
            if (previous?.data === undefined) {
                throw new Error('Invalid previous data');
            }
            if (tree[previous.id] === undefined) {
                throw new Error('Previous node not found');
            }
            throw new Error('Invalid previous node');
        }
    }
    #checkCurrent = ({ current, tree }) => {
        if (current?.id === undefined) {
            throw new Error('Invalid current node');
        }
        if (current?.data === undefined && current.id !== 'root') {
            throw new Error('Invalid current data');
        }
        if (tree[current.id] === undefined) {
            throw new Error('Current node not found');
        }
    }
    #checkCurrentNodeIsInPrevious = ({ previous, current, tree }) => {
        if (previous?.id !== undefined && tree[previous.id]?.choices !== undefined) {
            const choices = tree[previous.id].choices;
            const choice = choices.find(c => c.id === current.id);
            if (choice === undefined) {
                throw new Error('Current node not found in previous choices');
            }
        }
    }
    #findAvailableDatesNotInAppointments = async (startDate, appointmentsDateStrings) => {
        const availableDates = [];
        /** Set friday date related to startDate */
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + (5 - startDate.getDay()));
        /** ------------------------------- */

        while (startDate <= endDate) {
            if (
                startDate.getDay() >= 1 && startDate.getDay() <= 5 &&
                appointmentsDateStrings.indexOf(startDate.toDateString()) === -1 &&
                new Date().toDateString() !== startDate.toDateString()
            ) {
                availableDates.push(new Date(startDate));
            }

            //console.log(startDate);

            startDate.setDate(startDate.getDate() + 1);
        }

        /**
         * search for next available week
         */
        if (availableDates.length === 0) {
            let nextStartDate = new Date();
            nextStartDate.setDate(endDate.getDate() + 1);
            while (nextStartDate.getDay() !== 1) {
                nextStartDate.setDate(nextStartDate.getDate() + 1);
            }
            return this.#findAvailableDatesNotInAppointments(nextStartDate, appointmentsDateStrings);
        }

        //availableDates.forEach(d => {d.setHours(0, 0, 0, 0)});
        return availableDates;
    };
}

export default ChatBotController;
