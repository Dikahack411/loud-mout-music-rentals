"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface Instrument {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
}

const sampleInstruments: Instrument[] = [
  {
    id: "1",
    name: "Disk-Jockey",
    type: "DJ",
    image: "/2g.png",
    description:
      "A high-quality acoustic guitar perfect for beginners and professionals.",
  },
  {
    id: "2",
    name: "Roland Digital Piano",
    type: "Piano",
    image:
      "https://images.unsplash.com/photo-1548701213-a7c7872f4df7?w=800&auto=format&fit=crop&q=60",
    description: "A versatile digital piano with realistic sound and feel.",
  },
  {
    id: "3",
    name: "Pearl Drum Set",
    type: "Drums",
    image:
      "https://images.unsplash.com/photo-1707409189962-0e6cdf81fb16?w=800&auto=format&fit=crop&q=60",
    description: "A complete drum set for all your rhythm needs.",
  },
  {
    id: "4",
    name: "Acoustic Flutes",
    type: "Flutes",
    image:
      "https://images.unsplash.com/photo-1580719653258-26873fde0b4d?w=800&auto=format&fit=crop&q=60",
    description: "A simple flute for all your rhythm needs.",
  },
  {
    id: "5",
    name: "Brass Trumpet",
    type: "Brass",
    image:
      "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&auto=format&fit=crop&q=60",
    description: "A brass trumpet for all your rhythm needs.",
  },
  {
    id: "6",
    name: "Saxophone",
    type: "Saxophone",
    image:
      "https://images.unsplash.com/photo-1566454108377-77a89ec31134?w=800&auto=format&fit=crop&q=60",
    description: "A saxophone for all your rhythm needs.",
  },
  {
    id: "7",
    name: "Violin Set",
    type: "Violin",
    image:
      "https://images.unsplash.com/photo-1472312656035-eeef4726de6c?w=800&auto=format&fit=crop&q=60",
    description: "A complete violin set for all your rhythm needs.",
  },
  {
    id: "8",
    name: "Condenser Microphone",
    type: "Microphone",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    description: "A condenser microphone for all your vocal needs.",
  },
  {
    id: "9",
    name: "DJ Controller",
    type: "DJ Set",
    image:
      "https://images.unsplash.com/photo-1619597361832-a568b1e0555f?w=800&auto=format&fit=crop&q=60",
    description: "A complete DJ set for all your party needs.",
  },
  {
    id: "10",
    name: "Studio Set",
    type: "Drums",
    image:
      "https://images.unsplash.com/photo-1542464497-e217d476a9b2?w=800&auto=format&fit=crop&q=60",
    description: "A complete studio set for all your production needs.",
  },

  {
    id: "11",
    name: "Drum",
    type: "Drums",
    image:
      "https://media.istockphoto.com/id/2165367748/photo/drummers-and-their-instruments.webp?a=1&b=1&s=612x612&w=0&k=20&c=HiAnLo0yvZcrh1D3XRhUdJxIxeIhCK7CwFseXzJKn9g=",
    description: "A complete studio set for all your production needs.",
  },

  {
    id: "12",
    name: "Acoustic Guitar",
    type: "Guitar",
    image:
      "https://plus.unsplash.com/premium_photo-1681396937086-8a28edd8d257?w=800&auto=format&fit=crop&q=60",
    description: "A complete studio set for all your production needs.",
  },
];

const fetchInstruments = async (): Promise<Instrument[]> => {
  try {
    const res = await fetch("/api/instruments");
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (_error) {
    // fallback to sample data
    return sampleInstruments;
  }
};

const InstrumentsPage: React.FC = () => {
  const router = useRouter();
  // Paystack public key (test key, replace with your own in production)
  // const paystackPublicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx";

  // Function to launch Paystack payment modal
  // Function to navigate to payment page
  const handleRentNow = (instrument: Instrument) => {
    router.push(`/payment?instrumentId=${instrument.id}`);
  };
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  // const [newInstrument, setNewInstrument] = useState({
  //   name: "",
  //   type: "",
  //   image: "",
  //   description: "",
  // });

  useEffect(() => {
    fetchInstruments().then((data) => {
      setInstruments(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading instruments...</div>;

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setNewInstrument((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleAddInstrument = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const instrumentToAdd = {
  //       ...newInstrument,
  //       id: (instruments.length + 1).toString(),
  //   };
  //   setInstruments([...instruments, instrumentToAdd]);
  //   setNewInstrument({ name: "", type: "", image: "", description: "" });
  // };

  return (
    <>
      {/* Paystack Inline Script */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />
      <div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            margin: "8",
          }}
        >
          {instruments.map((inst) => (
            <div
              key={inst.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                width: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={inst.image}
                alt={inst.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h2 style={{ textAlign: "center" }}>{inst.name}</h2>
              <p style={{ textAlign: "center" }}>
                <strong>Type:</strong> {inst.type}
              </p>
              <p style={{ textAlign: "center" }}>{inst.description}</p>
              <button
                onClick={() => handleRentNow(inst)}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  background: "#5a3fc0",
                  color: "white",
                  border: "none",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstrumentsPage;
