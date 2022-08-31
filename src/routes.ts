import { Router } from "express";
import { ensureAuthenticatedClient } from "./middlewares/ensureAuthenticatedClient";
import { ensureAuthenticatedDeliveryman } from "./middlewares/ensureAuthenticatedDeliveryman";
import { AuthenticateClientController } from "./modules/accounts/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClients/CreateClientsController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliverymans/useCases/createDeliveryman/CreateDeliveryManController";
import { FindAllDMDeliveriesController } from "./modules/deliverymans/useCases/findAllDeliveries/FindAllDMDeliveriesController";


const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDMDeliveriesController = new FindAllDMDeliveriesController();
const updateEndDateController = new UpdateEndDateController();

routes.get("/clients/deliveries", ensureAuthenticatedClient, findAllDeliveriesController.handle);
routes.post("/clients/create", createClientController.handle);
routes.post("/clients/authenticate", authenticateClientController.handle);

routes.post("/deliveryman/create", createDeliverymanController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.get("/deliveryman/deliveries", ensureAuthenticatedDeliveryman, findAllDMDeliveriesController.handle);

routes.post("/delivery/create", ensureAuthenticatedClient, createDeliveryController.handle);
routes.get("/delivery/availables", ensureAuthenticatedDeliveryman, findAllAvailableController.handle);
routes.put("/delivery/update-deliveryman/:id", ensureAuthenticatedDeliveryman, updateDeliverymanController.handle);
routes.put("/delivery/update-end-date/:id", ensureAuthenticatedDeliveryman, updateEndDateController.handle);

export { routes };