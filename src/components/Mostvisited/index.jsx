import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import { Rating } from "@material-tailwind/react";

export default function Mostvisited() {
  const [rated, setRated] = React.useState(4);

  return (
    <div className="flex flex-wrap py-8 mt-8 justify-center gap-4 drop-shadow-xl">
      <Card className="w-64 h-full rounded-t-full  drop-shadow-xl">
        <CardHeader className="h-80 rounded-t-full">
          <img
            src="https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
            Tropical Hotel
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Guest Favourite
          </Typography>
        </CardBody>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 font-bold text-pink-600">
            {rated}.7
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Based on 134 Reviews
          </Typography>
          <div className="flex justify-center gap-7">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-64 h-full rounded-t-full drop-shadow-xl ">
        <CardHeader className="h-80 rounded-t-full">
          <img
            src="https://images.unsplash.com/photo-1600619754865-8fe927da0701?q=80&w=3148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
            Hotel By The Beach
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Guest Favourite
          </Typography>
        </CardBody>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 font-bold text-pink-600">
            {rated}.5
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Based on 202 Reviews
          </Typography>
          <div className="flex justify-center gap-7">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-64 h-full rounded-t-full drop-shadow-xl">
        <CardHeader className="h-80 rounded-t-full ">
          <img
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
            Norwegian Forest Cabin
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Guest Favourite
          </Typography>
        </CardBody>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 font-bold text-pink-600">
            {rated}.2
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Based on 98 Reviews
          </Typography>
          <div className="flex justify-center gap-7">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-64 h-full rounded-t-full ">
        <CardHeader className="h-80 rounded-t-full">
          <img
            src="https://voyagefox.net/wp-content/uploads/2022/07/calilo-sunrise-view.jpg"
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
            Beautiful Hotel In Greece
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Guest Favourite
          </Typography>
        </CardBody>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 font-bold text-pink-600">
            {rated}.9
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Based on 189 Reviews
          </Typography>
          <div className="flex justify-center gap-7">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
