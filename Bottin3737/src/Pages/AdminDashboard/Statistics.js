import React, { useEffect, useState } from 'react';
import PageTemplate from '../TypesPages/PageTemplate';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/firebase-config';
import { Box } from '@mui/material';

ChartJs.register(Tooltip, Title, ArcElement, Legend);
const Statistics = () => {
    const [companiesList, setCompaniesList] = useState([]);
    const [quotesList, setQuotes] = useState([]);
    const [refresh, setrefresh] = useState(false);

    async function fetchAllCompanies() {
        const conditions = [];
        conditions.push(where('active', '==', true), where('visible', '==', true))
        const q = query(collection(db, 'companies'), ...conditions);
    
        const querySnapshot = await getDocs(q);
    
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), uid: doc.id });
        });
        result.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    
        setCompaniesList(result);
        return result;
      }
console.log(companiesList)



async function fetchAllComplaines() {
   
    const q = query(collection(db, 'quotes'));

    const querySnapshot = await getDocs(q);

    let result = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), uid: doc.id });
    });
    result.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

    setQuotes(result);
    return result;
  }
console.log(quotesList)







    const categA = () => {
        var nbr = 0;
    
        companiesList?.filter((el) => {
          if (el.activityField === "Commerce") {
            nbr += 1;
          }
        });
        return nbr;
      };
      const nbrA = categA();

console.log(nbrA)

const categB = () => {
    var nbr = 0;

    companiesList?.filter((el) => {
      if (el.activityField === "marketing") {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrB = categB();

console.log(nbrB)


const categC = () => {
    var nbr = 0;

    companiesList?.filter((el) => {
      if (el.activityField === "arts" ||el.activityField === "Arts" ) {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrC = categC();

console.log(nbrC)


const categD = () => {
    var nbr = 0;

    companiesList?.filter((el) => {
      if (el.activityField === "Fabrication") {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrD = categD();

console.log(nbrD)





const categE = () => {
    var nbr = 0;

    companiesList?.filter((el) => {
      if (el.active === true) {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrActive = categE();

console.log(nbrActive)


const categF = () => {
    var nbr = 0;

    companiesList?.filter((el) => {
      if (el.active == false) {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrInactive = categF(); 

console.log(nbrInactive)


 // Quotes Statistics ....................................

 const quoteA = () => {
    var nbr = 0;

    quotesList?.filter((el) => {
      if (el.status === "null") {
        nbr += 1;
      }
    });
    return nbr;
  };
  const nbrQ = quoteA();

console.log(nbrQ)


const quoteB = () => {
var nbr = 0;

quotesList?.filter((el) => {
  if (el.status === "traité") {
    nbr += 1;
  }
});
return nbr;
};
const nbrQT = quoteB();

console.log(nbrQT)


const quoteC = () => {
var nbr = 0;

quotesList?.filter((el) => {
if (el.status === "consulté") {
nbr += 1;
}
});
return nbr;
};
const nbrQTA = quoteC();

console.log(nbrQTA)


const quoteD = () => {
    var nbr = 0;
    
    quotesList?.filter((el) => {
    if (el.status === "En cours de traitement") {
    nbr += 1;
    }
    });
    return nbr;
    };
    const nbrQTAA = quoteD();
    
    console.log(nbrQTAA)





    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Nombre des Companies (${companiesList?.length})` ,
          },
        },
      };

       
    
      const options1 = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Nombre des Quotes (${quotesList?.length})`,
          },
        },
      };
    
      const data = {
        labels: [ "Null", "Consulté","Traité","En cours de traitement"],
        datasets: [
          {
            label: `Quotes valable`,
            data: [nbrQ,nbrQTA,nbrQT,nbrQTAA],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const info = {
        labels: ["Commerce", "marketing","arts","Fabrication"],
        datasets: [
          {
            label: `Catégorie valable`,
            data: [nbrA,nbrB,nbrC,nbrD ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };


      const options2 = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Nombre des Companies (${nbrActive})`,
          },
        },
      };
    
      const datas = {
        labels: [ "Active"],
        datasets: [
          {
            label: `Quotes valable`,
            data: [nbrActive],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };



  useEffect(() => {
    fetchAllCompanies();
    fetchAllComplaines();
    // fetchStats();
  }, [refresh]);
  return (
    <PageTemplate>
       <div style={{ display: 'flex', justifyContent:"center", paddingTop:"100px" }}>
  <Box
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '20%',
      flexDirection: 'column',
      paddingBottom: '20px'
    }}
  >
    <div className="card col-md-4 w-hover-shadow">
      <div className="card-header"></div>
      <div className="card-body">
        <div className="">
          {/* <Doughnut data={data} options={options} /> */}
          <Doughnut data={info} options={options} />
        </div>
      </div>
    </div>
  </Box>
  <Box
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '20%',
      flexDirection: 'column',
      paddingBottom: '20px'
    }}
  >
    <div className="card col-md-4 w3-hover-shadow">
      <div className="card-header"></div>
      <div className="card-body">
        <Doughnut data={data} options={options1} />
      </div>
    </div>
  </Box>

  <Box
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '20%',
      flexDirection: 'column',
      paddingBottom: '20px'
    }}
  >
    <div className="card col-md-4 w3-hover-shadow">
      <div className="card-header"></div>
      <div className="card-body">
        <Doughnut data={datas} options={options2} />
      </div>
    </div>
  </Box>
</div>

    
    </PageTemplate>
  )
}

export default Statistics