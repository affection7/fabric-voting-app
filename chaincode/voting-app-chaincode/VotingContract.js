'use strict';

const { Contract } = require('fabric-contract-api');

class VotingContract extends Contract {
    async initLedger(ctx) {
        console.log('Ledger initialized');
    }

    async registerVoter(ctx, voterId, name) {
        const exists = await this.voterExists(ctx, voterId);
        if (exists) {
            throw new Error(`Voter ${voterId} already exists`);
        }

        const voter = {
            name,
            hasVoted: false,
        };

        await ctx.stub.putState(voterId, Buffer.from(JSON.stringify(voter)));
    }

    async castVote(ctx, voterId, candidate) {
        const voter = await this.readVoter(ctx, voterId);
        if (voter.hasVoted) {
            throw new Error(`${voterId} has already voted`);
        }

        voter.hasVoted = true;
        voter.candidate = candidate;

        await ctx.stub.putState(voterId, Buffer.from(JSON.stringify(voter)));
    }

    async readVoter(ctx, voterId) {
        const voterJSON = await ctx.stub.getState(voterId);
        if (!voterJSON || voterJSON.length === 0) {
            throw new Error(`Voter ${voterId} does not exist`);
        }

        return JSON.parse(voterJSON.toString());
    }

    async voterExists(ctx, voterId) {
        const voterJSON = await ctx.stub.getState(voterId);
        return voterJSON && voterJSON.length > 0;
    }
}

module.exports = VotingContract;

