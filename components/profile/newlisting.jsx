"use client";
import React, { useState, useEffect } from "react";
import axios from "@/config/axios"; // Assuming you have axios configured in your project
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";
import url from "@/config/axios";
import { useRouter, usePathname } from "next/navigation";

const NewListingComponent = ({ handleSectionChange }) => {
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [bedroom, setBedroom] = useState(1); // Changed from bedrooms
  const [bathroom, setBathroom] = useState(1); // Changed from bathrooms
  const [city, setCity] = useState("");
  const [citySlug, setCitySlug] = useState(""); // New field
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("");
  const [areaType, SetAreaType] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [shortVideo, setShortVideo] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [slug, setSlug] = useState(""); // New field
  const [btnLoad, setBtnLoad] = useState(false);
  const [allFeatures, setAllFeatures] = useState([]);

  const history = useRouter();
  const path = usePathname();

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    getFeatures();
  }, []);

  const getFeatures = async () => {
    url
      .get(`/api/mob/v1/Features/`)
      .then(async (res) => {
        setAllFeatures(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFeatureChange = (featureId) => {
    setFeatures((prevFeatures) =>
      prevFeatures.includes(featureId)
        ? prevFeatures.filter((id) => id !== featureId)
        : [...prevFeatures, featureId]
    );
  };

  const addFeatures = async (id) => {
    let body = {
      property_id: id,
      features,
    };
    url
      .post(`/api/mob/v1/add-features/`, body)
      .then(async (res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("agent_id", user?.id); // Assuming you have a user object with an id
    formData.append("agent", user?.id); // Assuming you have a user object with an id
    formData.append("purpose", purpose);
    formData.append("type", propertyType); // Update according to your actual field name in API
    formData.append("title", title);
    formData.append("price", price);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    formData.append("city", city);
    formData.append("city_slug", citySlug);
    formData.append("address", address);
    formData.append("area", area);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("area_unit", areaUnit);
    formData.append("area_type", areaType);
    formData.append("status", 1); // Assuming status is always set to 1
    features.forEach((featureId) => formData.append("features[]", featureId));
    if (videoLink) formData.append("video", videoLink); // Assuming video field for the video link
    if (shortVideo) formData.append("short_video", shortVideo); // Using "short_video" to match your data
    if (featuredImage) formData.append("image", featuredImage); // Assuming "image_url" for the featured image
    // return console.log(features);

    setBtnLoad(true);
    axios
      .post("/properties/properties/", formData)
      // .post("/api/mob/v1/Properties/", formData)
      .then(async (response) => {
        console.log("Form submitted successfully:", response.data);
        setBtnLoad(false);
        await addFeatures(response.data?.id);
        // Reset form fields after successful submission
        setPurpose("");
        setPropertyType("");
        setTitle("");
        setPrice("");
        setBedroom("");
        setBathroom("");
        setCity("");
        setCitySlug("");
        setAddress("");
        setArea("");
        setDescription("");
        setFeatures([]);
        setVideoLink("");
        setShortVideo(null);
        setFeaturedImage(null);
        setSlug("");

        if (path.includes("profile")) handleSectionChange("Properties");

        if (path.includes("add-properties")) history.push("/properties");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Property Added Successfully",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setBtnLoad(false);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        if (error.response) {
          if (error.response.status === 413) {
            // Handle 413 Payload Too Large error
            Toast.fire({
              icon: "error",
              title:
                "Payload too large. Please reduce the size of the files you are uploading.",
            });
          } else if (error.response.data) {
            const errorData = error.response.data;

            // If errorData is an object with multiple errors, show them one by one
            if (typeof errorData === "object") {
              Object.entries(errorData).forEach(([key, message]) => {
                Toast.fire({
                  icon: "error",
                  title: `${key}: ${message}`,
                });
              });
            } else {
              // If the errorData is a string or a single message, show it directly
              Toast.fire({
                icon: "error",
                title: errorData,
              });
            }
          } else {
            if (error.response.status === 413) {
              // Handle 413 Payload Too Large error
              Toast.fire({
                icon: "error",
                title:
                  "Payload too large. Please reduce the size of the files you are uploading.",
              });
            }
            // Fallback in case the error response doesn't contain data
            else {
              Toast.fire({
                icon: "error",
                title: "An unexpected error occurred.",
              });
            }
          }
        } else {
          // Handle other types of errors
          Toast.fire({
            icon: "error",
            title: "An unexpected error occurred.",
          });
        }
      });
  };

  return (
    <div className="bg-white min-h-screen pb-8">
      <div className="container mx-auto px-4 pb-8 bg-white text-black max-w-7xl">
        <h2 className="text-2xl font-bold mb-8">Create Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Left Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label htmlFor="purpose" className="block text-gray-700">
                  Select Purpose
                </label>
                <select
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Purpose</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-gray-700">
                  Type of Property
                </label>
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-gray-700">
                  Type of Area
                </label>
                <select
                  id="propertyType"
                  value={areaType}
                  onChange={(e) => SetAreaType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Type</option>

                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-gray-700">
                  Property Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-gray-700">
                  Property Slug
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="bedroom" className="block text-gray-700">
                  Bedrooms
                </label>
                <input
                  id="bedroom"
                  type="number"
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="bathroom" className="block text-gray-700">
                  Bathrooms
                </label>
                <input
                  id="bathroom"
                  type="number"
                  value={bathroom}
                  onChange={(e) => setBathroom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">
                  City
                </label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="" disabled selected>
                    Select The City
                  </option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="" disabled>
                    Punjab Cities
                  </option>
                  <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                  <option value="Ahmadpur East">Ahmadpur East</option>
                  <option value="Ali Khan Abad">Ali Khan Abad</option>
                  <option value="Alipur">Alipur</option>
                  <option value="Arifwala">Arifwala</option>
                  <option value="Attock">Attock</option>
                  <option value="Bhera">Bhera</option>
                  <option value="Bhalwal">Bhalwal</option>
                  <option value="Bahawalnagar">Bahawalnagar</option>
                  <option value="Bahawalpur">Bahawalpur</option>
                  <option value="Bhakkar">Bhakkar</option>
                  <option value="Burewala">Burewala</option>
                  <option value="Chillianwala">Chillianwala</option>
                  <option value="Chakwal">Chakwal</option>
                  <option value="Chichawatni">Chichawatni</option>
                  <option value="Chiniot">Chiniot</option>
                  <option value="Chishtian">Chishtian</option>
                  <option value="Daska">Daska</option>
                  <option value="Darya Khan">Darya Khan</option>
                  <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                  <option value="Dhaular">Dhaular</option>
                  <option value="Dina">Dina</option>
                  <option value="Dinga">Dinga</option>
                  <option value="Dipalpur">Dipalpur</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Ferozewala">Ferozewala</option>
                  <option value="Fateh Jhang">Fateh Jang</option>
                  <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                  <option value="Gojra">Gojra</option>
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Gujrat">Gujrat</option>
                  <option value="Gujar Khan">Gujar Khan</option>
                  <option value="Hafizabad">Hafizabad</option>
                  <option value="Haroonabad">Haroonabad</option>
                  <option value="Hasilpur">Hasilpur</option>
                  <option value="Haveli Lakha">Haveli Lakha</option>
                  <option value="Jatoi">Jatoi</option>
                  <option value="Jalalpur">Jalalpur</option>
                  <option value="Jattan">Jattan</option>
                  <option value="Jampur">Jampur</option>
                  <option value="Jaranwala">Jaranwala</option>
                  <option value="Jhang">Jhang</option>
                  <option value="Jhelum">Jhelum</option>
                  <option value="Kalabagh">Kalabagh</option>
                  <option value="Karor Lal Esan">Karor Lal Esan</option>
                  <option value="Kasur">Kasur</option>
                  <option value="Kamalia">Kamalia</option>
                  <option value="Kamoke">Kamoke</option>
                  <option value="Khanewal">Khanewal</option>
                  <option value="Khanpur">Khanpur</option>
                  <option value="Kharian">Kharian</option>
                  <option value="Khushab">Khushab</option>
                  <option value="Kot Addu">Kot Addu</option>
                  <option value="Jauharabad">Jauharabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Lalamusa">Lalamusa</option>
                  <option value="Layyah">Layyah</option>
                  <option value="Liaquat Pur">Liaquat Pur</option>
                  <option value="Lodhran">Lodhran</option>
                  <option value="Malakwal">Malakwal</option>
                  <option value="Mamoori">Mamoori</option>
                  <option value="Mailsi">Mailsi</option>
                  <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                  <option value="Mian Channu">Mian Channu</option>
                  <option value="Mianwali">Mianwali</option>
                  <option value="Multan">Multan</option>
                  <option value="Murree">Murree</option>
                  <option value="Muridke">Muridke</option>
                  <option value="Mianwali Bangla">Mianwali Bangla</option>
                  <option value="Muzaffargarh">Muzaffargarh</option>
                  <option value="Narowal">Narowal</option>
                  <option value="Nankana Sahib">Nankana Sahib</option>
                  <option value="Okara">Okara</option>
                  <option value="Renala Khurd">Renala Khurd</option>
                  <option value="Pakpattan">Pakpattan</option>
                  <option value="Pattoki">Pattoki</option>
                  <option value="Pir Mahal">Pir Mahal</option>
                  <option value="Qaimpur">Qaimpur</option>
                  <option value="Qila Didar Singh">Qila Didar Singh</option>
                  <option value="Rabwah">Rabwah</option>
                  <option value="Raiwind">Raiwind</option>
                  <option value="Rajanpur">Rajanpur</option>
                  <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Sadiqabad">Sadiqabad</option>
                  <option value="Safdarabad">Safdarabad</option>
                  <option value="Sahiwal">Sahiwal</option>
                  <option value="Sangla Hill">Sangla Hill</option>
                  <option value="Sarai Alamgir">Sarai Alamgir</option>
                  <option value="Sargodha">Sargodha</option>
                  <option value="Shakargarh">Shakargarh</option>
                  <option value="Sheikhupura">Sheikhupura</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Sohawa">Sohawa</option>
                  <option value="Soianwala">Soianwala</option>
                  <option value="Siranwali">Siranwali</option>
                  <option value="Talagang">Talagang</option>
                  <option value="Taxila">Taxila</option>
                  <option value="Toba Tek Singh">Toba Tek Singh</option>
                  <option value="Vehari">Vehari</option>
                  <option value="Wah Cantonment">Wah Cantonment</option>
                  <option value="Wazirabad">Wazirabad</option>
                  <option value="" disabled>
                    Sindh Cities
                  </option>
                  <option value="Badin">Badin</option>
                  <option value="Bhirkan">Bhirkan</option>
                  <option value="Rajo Khanani">Rajo Khanani</option>
                  <option value="Chak">Chak</option>
                  <option value="Dadu">Dadu</option>
                  <option value="Digri">Digri</option>
                  <option value="Diplo">Diplo</option>
                  <option value="Dokri">Dokri</option>
                  <option value="Ghotki">Ghotki</option>
                  <option value="Haala">Haala</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Islamkot">Islamkot</option>
                  <option value="Jacobabad">Jacobabad</option>
                  <option value="Jamshoro">Jamshoro</option>
                  <option value="Jungshahi">Jungshahi</option>
                  <option value="Kandhkot">Kandhkot</option>
                  <option value="Kandiaro">Kandiaro</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Kashmore">Kashmore</option>
                  <option value="Keti Bandar">Keti Bandar</option>
                  <option value="Khairpur">Khairpur</option>
                  <option value="Kotri">Kotri</option>
                  <option value="Larkana">Larkana</option>
                  <option value="Matiari">Matiari</option>
                  <option value="Mehar">Mehar</option>
                  <option value="Mirpur Khas">Mirpur Khas</option>
                  <option value="Mithani">Mithani</option>
                  <option value="Mithi">Mithi</option>
                  <option value="Mehrabpur">Mehrabpur</option>
                  <option value="Moro">Moro</option>
                  <option value="Nagarparkar">Nagarparkar</option>
                  <option value="Naudero">Naudero</option>
                  <option value="Naushahro Feroze">Naushahro Feroze</option>
                  <option value="Naushara">Naushara</option>
                  <option value="Nawabshah">Nawabshah</option>
                  <option value="Nazimabad">Nazimabad</option>
                  <option value="Qambar">Qambar</option>
                  <option value="Qasimabad">Qasimabad</option>
                  <option value="Ranipur">Ranipur</option>
                  <option value="Ratodero">Ratodero</option>
                  <option value="Rohri">Rohri</option>
                  <option value="Sakrand">Sakrand</option>
                  <option value="Sanghar">Sanghar</option>
                  <option value="Shahbandar">Shahbandar</option>
                  <option value="Shahdadkot">Shahdadkot</option>
                  <option value="Shahdadpur">Shahdadpur</option>
                  <option value="Shahpur Chakar">Shahpur Chakar</option>
                  <option value="Shikarpaur">Shikarpaur</option>
                  <option value="Sukkur">Sukkur</option>
                  <option value="Tangwani">Tangwani</option>
                  <option value="Tando Adam Khan">Tando Adam Khan</option>
                  <option value="Tando Allahyar">Tando Allahyar</option>
                  <option value="Tando Muhammad Khan">
                    Tando Muhammad Khan
                  </option>
                  <option value="Thatta">Thatta</option>
                  <option value="Umerkot">Umerkot</option>
                  <option value="Warah">Warah</option>
                  <option value="" disabled>
                    Khyber Cities
                  </option>
                  <option value="Abbottabad">Abbottabad</option>
                  <option value="Adezai">Adezai</option>
                  <option value="Alpuri">Alpuri</option>
                  <option value="Akora Khattak">Akora Khattak</option>
                  <option value="Ayubia">Ayubia</option>
                  <option value="Banda Daud Shah">Banda Daud Shah</option>
                  <option value="Bannu">Bannu</option>
                  <option value="Batkhela">Batkhela</option>
                  <option value="Battagram">Battagram</option>
                  <option value="Birote">Birote</option>
                  <option value="Chakdara">Chakdara</option>
                  <option value="Charsadda">Charsadda</option>
                  <option value="Chitral">Chitral</option>
                  <option value="Daggar">Daggar</option>
                  <option value="Dargai">Dargai</option>
                  <option value="Darya Khan">Darya Khan</option>
                  <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                  <option value="Doaba">Doaba</option>
                  <option value="Dir">Dir</option>
                  <option value="Drosh">Drosh</option>
                  <option value="Hangu">Hangu</option>
                  <option value="Haripur">Haripur</option>
                  <option value="Karak">Karak</option>
                  <option value="Kohat">Kohat</option>
                  <option value="Kulachi">Kulachi</option>
                  <option value="Lakki Marwat">Lakki Marwat</option>
                  <option value="Latamber">Latamber</option>
                  <option value="Madyan">Madyan</option>
                  <option value="Mansehra">Mansehra</option>
                  <option value="Mardan">Mardan</option>
                  <option value="Mastuj">Mastuj</option>
                  <option value="Mingora">Mingora</option>
                  <option value="Nowshera">Nowshera</option>
                  <option value="Paharpur">Paharpur</option>
                  <option value="Pabbi">Pabbi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Saidu Sharif">Saidu Sharif</option>
                  <option value="Shorkot">Shorkot</option>
                  <option value="Shewa Adda">Shewa Adda</option>
                  <option value="Swabi">Swabi</option>
                  <option value="Swat">Swat</option>
                  <option value="Tangi">Tangi</option>
                  <option value="Tank">Tank</option>
                  <option value="Thall">Thall</option>
                  <option value="Timergara">Timergara</option>
                  <option value="Tordher">Tordher</option>
                  <option value="" disabled>
                    Balochistan Cities
                  </option>
                  <option value="Awaran">Awaran</option>
                  <option value="Barkhan">Barkhan</option>
                  <option value="Chagai">Chagai</option>
                  <option value="Dera Bugti">Dera Bugti</option>
                  <option value="Gwadar">Gwadar</option>
                  <option value="Harnai">Harnai</option>
                  <option value="Jafarabad">Jafarabad</option>
                  <option value="Jhal Magsi">Jhal Magsi</option>
                  <option value="Kacchi">Kacchi</option>
                  <option value="Kalat">Kalat</option>
                  <option value="Kech">Kech</option>
                  <option value="Kharan">Kharan</option>
                  <option value="Khuzdar">Khuzdar</option>
                  <option value="Killa Abdullah">Killa Abdullah</option>
                  <option value="Killa Saifullah">Killa Saifullah</option>
                  <option value="Kohlu">Kohlu</option>
                  <option value="Lasbela">Lasbela</option>
                  <option value="Lehri">Lehri</option>
                  <option value="Loralai">Loralai</option>
                  <option value="Mastung">Mastung</option>
                  <option value="Musakhel">Musakhel</option>
                  <option value="Nasirabad">Nasirabad</option>
                  <option value="Nushki">Nushki</option>
                  <option value="Panjgur">Panjgur</option>
                  <option value="Pishin Valley">Pishin Valley</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sherani">Sherani</option>
                  <option value="Sibi">Sibi</option>
                  <option value="Sohbatpur">Sohbatpur</option>
                  <option value="Washuk">Washuk</option>
                  <option value="Zhob">Zhob</option>
                  <option value="Ziarat">Ziarat</option>
                </select>
              </div>
              <div>
                <label htmlFor="citySlug" className="block text-gray-700">
                  City Slug
                </label>
                <input
                  id="citySlug"
                  type="text"
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-gray-700">
                  Area
                </label>
                <input
                  id="area"
                  type="number" // Changed to number input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-gray-700">
                  Type of Area
                </label>
                <select
                  id="propertyType"
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Type</option>

                  <option value="marla">marla</option>
                  <option value="kanal">kanal</option>
                  <option value="ft²">ft²</option>
                  <option value="acre">acre</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label htmlFor="features" className="block text-gray-700">
                  Features
                </label>
                <div className="flex flex-wrap">
                  {allFeatures?.map((feature) => (
                    <div key={feature.id} className="mr-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={features.includes(feature.id)}
                          onChange={() => handleFeatureChange(feature.id)}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{feature.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="videoLink" className="block text-gray-700">
                  Video Link
                </label>
                <input
                  id="videoLink"
                  type="text"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="shortVideo" className="block text-gray-700">
                  Short Video
                </label>
                <input
                  id="shortVideo"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setShortVideo(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="featuredImage" className="block text-gray-700">
                  Upload Featured Image
                </label>
                <input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
            </div>
          </div>
          {btnLoad ? (
            <div className="flex justify-center items-center">
              <ScaleLoader color="#eab308" />
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md poppins">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewListingComponent;
