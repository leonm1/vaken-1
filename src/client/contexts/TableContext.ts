import React, { createContext } from 'react';
import { SortDirectionType } from 'react-virtualized';
import { Update } from 'use-immer';

export enum HackerStatus {
	created = 'created',
	verified = 'verified',
	started = 'started',
	submitted = 'submitted',
	accepted = 'accepted',
	confirmed = 'confirmed',
	rejected = 'rejected',
}

export const columnOptions = [
	{ label: 'First Name', value: 'firstName' },
	{ label: 'Last Name', value: 'lastName' },
	{ label: 'Email Address', value: 'email' },
	{ label: 'School', value: 'school' },
	{ label: 'Graduation Year', value: 'gradYear' },
	{ label: 'Status', value: 'status' },
	{ label: 'Reimbursement', value: 'needsReimbursment' },
];

// TODO(alan): convert status from hackerData JSON from types string to HackerStatus and remove union type
export interface Hacker {
	firstName: string;
	lastName: string;
	email: string;
	gradYear?: number;
	school?: string;
	status: HackerStatus | string;
	needsReimbursement?: boolean;
}

export interface Option {
	label: string;
	value: string;
}
export interface TableState {
	sortBy?: string;
	sortDirection?: SortDirectionType;
	searchValue: string;
	selectedColumns: Option[];
	selectAll: boolean;
	hasSelection: boolean;
	selectedRowsEmails: string[];
	useRegex: boolean;
}

export const defaultTableState = {
	hasSelection: false,
	searchValue: '',
	selectAll: false,
	selectedColumns: [columnOptions[0]],
	selectedRowsEmails: [],
	useRegex: false,
};

export interface TableCtxI {
	state: TableState;
	update: Update<TableState>;
}

export const TableContext = createContext<TableCtxI>({
	state: defaultTableState,
	update: () => {},
});
