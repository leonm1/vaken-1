import {
	EventUpdate,
	AddOrUpdateEventMutationFn,
	AssignEventToCompanyMutationFn,
} from './ManageEventTypes';

export async function updateEventsHandler(
	events: null | EventUpdate[],
	addOrUpdateEventFunction: AddOrUpdateEventMutationFn
): Promise<string[]> {
	if (events) {
		return Promise.all(
			events.map(async event => {
				const result = await addOrUpdateEventFunction({
					variables: {
						input: {
							...event,
						},
					},
				});

				if (!result.data)
					throw new Error(`${(result.errors || []).map(error => JSON.stringify(error))}`);

				return result.data.addOrUpdateEvent.name;
			})
		);
	}
	return [];
}

export async function assignEventHandler(
	eventID: string,
	companyID: string,
	assignEventToCompanyFunction: AssignEventToCompanyMutationFn
): Promise<void> {
	if (eventID && companyID) {
		await assignEventToCompanyFunction({
			variables: {
				input: {
					companyId: companyID,
					eventId: eventID,
				},
			},
		});
	}
}