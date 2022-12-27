const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection')

async function getAllTickets(req, res){
    console.log("getAllTickets");

    const users = await models.ticket.findAll();
    if(Utility.isArrayNullOrEmpty(users)){
        res.status(404).send("Tickets not found")
    } else{
        res.status(200).json(users);
    }

}

async function getTicketById(req, res){
    console.log("get ticket by id");
    const ticket = await models.user.findByPk(req.params.id);
    if (ticket) {
		res.status(200).json(ticket);
	} else {
		res.status(404).send('404 - Tickets not found');
	}
}

async function getTicketByCode(req, res){
    console.log("get ticket by id");
    const ticket = await models.user.findByPk(req.params.code);
    if (ticket) {
		res.status(200).json(ticket);
	} else {
		res.status(404).send('404 - Tickets not found');
	}
}

async function createTicket(req, res){
    console.log("create Ticket");

    var user = req.body;

    user = await models.ticket.create({
        "username": user.username,
        "password":user.password,
        "role_id":user.role_id
    })

    console.log(user);
    res.status(200).json(user);

}

async function deleteTicket(req, res){
    console.log("delete User");

    user = await models.user.destroy({where:{ "id":req.params.id}})

    console.log(user);
    res.status(200).json(user);
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicket
}