import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/getallcourse"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    // Fetch cart items from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    fetchCourses();
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (course) => {
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (courseId) => {
    const updatedCart = cart.filter((course) => course._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="mb-4 flex items-center gap-4 mx-3 flex-wrap">
        <h1 className="text-2xl font-semibold">All Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border max-w-[500px] border-gray-300 rounded-md w-full"
        />
      </div>
      {loading ? ( // Display loading spinner if data is being fetched
        <div className="flex justify-center mt-8">
          <div className="font-2xl font-bold">Loading.........</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-white shadow-lg rounded-lg p-4">
              <Link to={`/courses/${course._id}`}>
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-[200px] object-cover rounded-lg mb-3"
                />
                <h2 className="text-xl font-bold">{course.name}</h2>
                <p>Instructor: {course.instructor}</p>
                <p>Description: {course.description}</p>
                <p>Enrollment Status: {course.enrollmentStatus}</p>
                <p>Duration: {course.duration}</p>
              </Link>
              <div className="flex justify-between mt-4">
                {!cart.find((item) => item._id === course._id) ? ( // Render Buy button if course is not in cart
                  <button
                    onClick={() => handleAddToCart(course)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromCart(course._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove the subscription
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseListingPage;
